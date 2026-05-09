# Azure Functions Node.js Extensions Base

The Azure Functions Node.js Extensions Base Library provides core interfaces, classes, and utilities for building extension components for Azure Functions in JavaScript and TypeScript to recognize and bind to SDK types. **It is not intended for direct use**. Instead, please reference one of the extending packages:

[@azure/functions-extensions-bindings-blob](https://github.com/Azure/azure-functions-nodejs-extensions/tree/main/azure-functions-nodejs-extensions-blob)

## Features

-   **Resource Factory Resolver**: Core singleton class for registering and retrieving Azure resource factories
-   **Model Binding Support**: Types and interfaces for binding Azure resources to Function parameters
-   **Type-Safe Bindings**: Type definitions for supported Azure binding types
-   **Extension Registration**: Foundation for registering extensions in Azure Functions

## Integration with Azure Functions

This library serves as a foundation for Azure Functions extensions that provide additional bindings or integration capabilities. For examples of extensions built on this library, see:

-   [@azure/functions-extensions-bindings-blob](https://github.com/Azure/azure-functions-nodejs-extensions/tree/main/azure-functions-nodejs-extensions-blob)

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Resources

-   [Azure Functions Documentation](https://learn.microsoft.com/azure/azure-functions/)
-   [Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

---

## Reporting Issues

If you find a bug or have a suggestion for improvement, please [open an issue](https://github.com/Azure/azure-functions-nodejs-extensions/issues) on our GitHub repository.
