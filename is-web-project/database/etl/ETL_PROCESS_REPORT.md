# 3. ETL Process for Product Data

## 3.1 Purpose
This section describes the ETL (Extract - Transform - Load) process used to import product data from CSV files into the e-commerce database. The objective is to ensure that product, category, variant, and image information is loaded in a consistent and repeatable way for development and testing.

## 3.2 Data Source
The source file is a structured CSV document (`products.sample.csv`) containing product metadata such as product name, SKU, brand, category slugs, price, stock, images, and optional variant definitions.

## 3.3 ETL Stages

### 3.3.1 Extract
In the Extract stage, the system reads the CSV file and checks whether:
- the file exists,
- the file is readable,
- required columns are present.

If any of these checks fail, the process stops and returns an error message. This stage ensures that only valid input files are processed.

### 3.3.2 Transform
In the Transform stage, each row is standardized and validated before loading:
- text fields are trimmed and normalized,
- product slug values are standardized,
- category slug lists and image filename lists are split and cleaned,
- variant strings are parsed into structured attributes,
- missing or invalid business values are flagged.

Additional transformation rules include:
- creating a default variant when no variant is provided,
- converting boolean-like values (for example `true`, `1`, `yes`) into a database boolean,
- constructing image URLs in the form `/images/products/<slug>/<filename>`.

### 3.3.3 Load
In the Load stage, validated data is written to relational tables:
- `products` is inserted or updated using `slug` as the matching key,
- `brands` is created automatically if the provided brand slug does not exist,
- `product_categories` links are synchronized,
- `product_variants` for each product are replaced with the transformed variant set,
- `product_images` for each product are replaced with the transformed image list.

The command also supports a dry-run mode. In dry-run mode, the ETL executes all logic and validation but rolls back the transaction at the end, so no permanent database change is made.

## 3.4 Execution Summary Output
After execution, the ETL prints summary metrics:
- Processed rows,
- Created products,
- Updated products,
- Failed rows.

These metrics are used to evaluate data quality and import completeness.

## 3.5 Suggested Figures (Screenshots)
Include the following screenshots in the final academic report:

Figure 3.1 - Sample source CSV structure (header and sample rows).  
Figure 3.2 - Dry-run terminal output showing validation and ETL summary.  
Figure 3.3 - Import mode terminal output (successful load).  
Figure 3.4 - Database verification (products, variants, and images after load).  

Example insertion template:

```markdown
![Figure 3.1. Sample CSV structure](./screenshots/etl-figure-3-1-csv.png)
![Figure 3.2. Dry-run command result](./screenshots/etl-figure-3-2-dry-run.png)
![Figure 3.3. Import command result](./screenshots/etl-figure-3-3-import.png)
![Figure 3.4. Post-load database verification](./screenshots/etl-figure-3-4-db-check.png)
```

## 3.6 Conclusion
The implemented ETL process provides a controlled pipeline for product data onboarding. By separating extraction, transformation, and loading concerns, the process improves data consistency, supports error isolation at row level, and enables safe validation through dry-run execution before actual import.
