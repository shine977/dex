const { parse } = require("yaml");
const fs = require("fs");
const path = require("path");

const messagesDir = path.join(process.cwd(), "src/messages");
const outputDir = path.join(process.cwd(), "public/locales");

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 读取并解析所有 YAML 文件
fs.readdirSync(messagesDir)
  .filter((file) => file.endsWith(".yml"))
  .forEach((file) => {
    const content = fs.readFileSync(path.join(messagesDir, file), "utf8");
    const messages = parse(content);
    const locale = path.basename(file, ".yml");

    // 将解析后的 JSON 写入 public/locales 目录
    fs.writeFileSync(
      path.join(outputDir, `${locale}.json`),
      JSON.stringify(messages, null, 2)
    );
  });
