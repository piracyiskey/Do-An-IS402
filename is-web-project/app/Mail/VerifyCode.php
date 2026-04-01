<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyCode extends Mailable
{
    use Queueable, SerializesModels;

    // 1. Declare a public property to hold the code
    public $verificationCode;

    /**
     * Create a new message instance.
     *
     * @param  string  $code  The verification code to send
     */
    public function __construct(string $code)
    {
        // 2. Assign the code passed to the constructor to the public property
        $this->verificationCode = $code;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Account Verification Code', // A clearer subject
        );
    }

    /**
     * Get the message content definition.
     */
    public function build()
    {
        // Use the html method to set raw HTML content
        return $this->html('<h1>Verification Code: '.$this->verificationCode.'</h1>');
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
