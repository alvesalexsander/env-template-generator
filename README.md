# env-template-generator
Auto-generate env template files for your project. Includes recursive and file mode.

## Installation

- We recommend env-template-generator as a global module.

[RECOMMENDED] Global installation:

npm install -g env-template-generator

Project-level installation:

npm install env-template-generator

## Usage

- ### File Mode
 Generate a <em>env-template</em> file for a specified <em>.env</em> file on the same directory as the specified file.

```
env-template-generator -f /LOCATION_TO_DOTENV_FILE/.env
```

- ### Recursive Mode
Generate one or multiple <em>env-template</em> file(s) scanning for <em>.env</em> files in a specified directory and its sub-directories.

```
env-template-generator -r /DIRECTORY_TO_START_SCANNING
```
