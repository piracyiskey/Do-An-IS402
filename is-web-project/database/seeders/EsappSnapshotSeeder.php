<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class EsappSnapshotSeeder extends Seeder
{
    public function run(): void
    {
        $sqlPath = database_path('esapp.sql');

        if (!file_exists($sqlPath)) {
            throw new RuntimeException("Snapshot SQL file not found at: {$sqlPath}");
        }

        [$statements, $tables] = $this->extractInsertStatements($sqlPath);

        if (empty($statements)) {
            throw new RuntimeException('No INSERT statements found in database/esapp.sql');
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        foreach ($tables as $table) {
            if ($table === 'migrations') {
                continue;
            }

            DB::table($table)->truncate();
        }

        foreach ($statements as $statementData) {
            if ($statementData['table'] === 'migrations') {
                continue;
            }

            DB::unprepared($statementData['sql']);
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }

    private function extractInsertStatements(string $sqlPath): array
    {
        $handle = fopen($sqlPath, 'r');

        if ($handle === false) {
            throw new RuntimeException("Unable to open SQL file: {$sqlPath}");
        }

        $collecting = false;
        $buffer = '';
        $statements = [];
        $tableOrder = [];

        while (($line = fgets($handle)) !== false) {
            $trimmed = ltrim($line);

            if (!$collecting) {
                if (str_starts_with($trimmed, 'INSERT INTO `')) {
                    $collecting = true;
                    $buffer = $line;
                }

                continue;
            }

            $buffer .= $line;

            if (!str_contains($line, ';')) {
                continue;
            }

            if (preg_match('/INSERT\s+INTO\s+`([^`]+)`/i', $buffer, $matches)) {
                $table = $matches[1];
                $statements[] = [
                    'table' => $table,
                    'sql' => $buffer,
                ];

                if (!in_array($table, $tableOrder, true)) {
                    $tableOrder[] = $table;
                }
            }

            $collecting = false;
            $buffer = '';
        }

        fclose($handle);

        return [$statements, $tableOrder];
    }
}
