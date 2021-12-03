const fs = require('fs');
const path = require('path');

const mode = process.argv[2];
const inputPath = process.argv[3];

const watermark = `# GENERATED WITH generate-env-template.js\n\n`;

function main() {
  console.log('generate-env-template :: STARTING');
  switch (mode) {
      case '-f':
          generateEnvTemplate(inputPath);
          console.log('generate-env-template :: DONE');
          break;
      case '-r':
          recursiveGenerateEnv(getPath(inputPath));
          console.log('generate-env-template :: DONE');
          break;
      default:
          console.log('generate-env-template :: ERROR :: operation not supported');
  }
}

function recursiveGenerateEnv(path) {
    if (!fs.lstatSync(path)?.isDirectory()) {
        return;
    }

    if (hasDotEnvFile(path)) {
        generateEnvTemplate(path + '/.env');
    }

    const innerDirs = getDirectories(getPath(path));
    if (innerDirs.length) {
        for (const dir of innerDirs) {
            recursiveGenerateEnv(getPath(path + `/${dir}`));
        }
    }
}

function getPath(inputPath) {
    try {
        return path.resolve(inputPath);
    } catch (err) {
        return '';
    }
}

function hasDotEnvFile(dirPath) {
    return fs.existsSync(dirPath + '/.env');
}

function generateEnvTemplate(path) {
    const fileContent = fs.readFileSync(getPath(path)).toString().replace(/=.*/gm, '=');

    if (fileContent) {
        const lastDirectorySlash = path.lastIndexOf('/') ?? inputPath.lastIndexOf('\\');
        fs.writeFileSync(`${path.substr(0, lastDirectorySlash + 1)}env.tmpl`, watermark + fileContent);
        console.log(`GENERATING ENV TEMPLATE AT ${getPath(path.substr(0, lastDirectorySlash + 1))}/env.tmpl`);
    }
}

function getDirectories(path) {
    return fs.readdirSync(path, { withFileTypes: true })
        .filter(dir => dir.isDirectory())
        .map(dir => dir.name);
}

module.exports = main;