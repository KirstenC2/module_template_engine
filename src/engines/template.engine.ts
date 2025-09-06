import * as handlebars from 'handlebars';
import * as path from 'path';
import * as fs from 'fs';
import { FileUtil } from '../utils/file.util';

// 注册一些常用的辅助函数
handlebars.registerHelper('toLowerCase', (str: string) => str.toLowerCase());
handlebars.registerHelper('toUpperCase', (str: string) => str.toUpperCase());
handlebars.registerHelper('eq', (a: any, b: any) => a === b);

// 新增：數據類型映射
handlebars.registerHelper('toSequelizeType', (type: string) => {
    const map: Record<string, string> = {
      int: 'INTEGER',
      integer: 'INTEGER',
      string: 'STRING',
      str: 'STRING',
      text: 'TEXT',
      boolean: 'BOOLEAN',
      bool: 'BOOLEAN',
      datetime: 'DATE',
      date: 'DATE'
    };
    return map[type.toLowerCase()] || 'STRING';
  });
  
  

// 新增：轉換為 TypeScript 類型
handlebars.registerHelper('toTsType', (type: string) => {
  const typeMap: { [key: string]: string } = {
    'int': 'number',
    'integer': 'number',
    'string': 'string',
    'str': 'string',
    'text': 'string',
    'datetime': 'Date',
    'date': 'Date',
    'boolean': 'boolean',
    'bool': 'boolean'
  };
  return typeMap[type] || 'any';
});


export class TemplateEngine {
  private templates: Map<string, handlebars.TemplateDelegate> = new Map();
  private templateDir: string;

  constructor() {
    // 使用正確的路徑：從項目根目錄開始
    this.templateDir = path.join(process.cwd(), 'templates');
    console.log('📁 模板目录:', this.templateDir);
  }

  

  loadAllTemplates(): boolean {
    console.log('🔄 加载模板文件...');
    
    // 定義模板文件的路徑映射
    const templateMap = {
      module: 'module/module.hbs',
      model: 'model/model.hbs',
      dto: 'dto/dto.hbs',
      service: 'service/service.hbs',
      controller: 'controller/controller.hbs'
    };

    Object.entries(templateMap).forEach(([templateName, templatePath]) => {
      const fullTemplatePath = path.join(this.templateDir, templatePath);
      console.log(`  正在加载: ${templatePath}`);
      
      if (FileUtil.fileExists(fullTemplatePath)) {
        try {
          const templateContent = FileUtil.readFile(fullTemplatePath);
          const template = handlebars.compile(templateContent);
          this.templates.set(templateName, template);
          console.log(`  ✅ 加载成功: ${templateName}`);
        } catch (error) {
          console.error(`  ❌ 加载失败 ${templateName}:`, error.message);
        }
      } else {
        console.error(`  ❌ 文件不存在: ${fullTemplatePath}`);
      }
    });

    // 檢查加載結果
    const loadedTemplates = Array.from(this.templates.keys());
    if (loadedTemplates.length > 0) {
      console.log(`✅ 成功加载 ${loadedTemplates.length} 个模板:`, loadedTemplates.join(', '));
      return true;
    } else {
      console.error('❌ 没有加载任何模板文件！');
      this.showAvailableTemplates();
      return false;
    }
  }

  private showAvailableTemplates(): void {
    console.log('🔍 扫描模板目录结构...');
    this.scanDir(this.templateDir, 0);
  }

  private scanDir(dirPath: string, depth: number): void {
    try {
      if (!fs.existsSync(dirPath)) {
        console.log(`❌ 目录不存在: ${dirPath}`);
        return;
      }

      const items = fs.readdirSync(dirPath);
      const indent = '  '.repeat(depth);
      
      if (items.length === 0) {
        console.log(`${indent}📁 (空目录)`);
        return;
      }

      items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          console.log(`${indent}📁 ${item}/`);
          this.scanDir(fullPath, depth + 1);
        } else if (stat.isFile() && item.endsWith('.hbs')) {
          console.log(`${indent}📄 ${item} (找到模板!)`);
        } else if (stat.isFile()) {
          console.log(`${indent}📄 ${item}`);
        }
      });
    } catch (error) {
      console.error(`无法扫描目录 ${dirPath}:`, error.message);
    }
  }

  render(templateName: string, data: any): string {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`模板 ${templateName} 未加载，请检查模板文件是否存在`);
    }
    return template(data);
  }

  generateFile(outputPath: string, templateName: string, data: any): boolean {
    try {
      if (!this.templates.has(templateName)) {
        throw new Error(`模板 ${templateName} 未加载`);
      }
      
      const content = this.render(templateName, data);
      FileUtil.writeFile(outputPath, content);
      console.log(`✅ 生成  文件: ${outputPath}`);
      return true;
    } catch (error) {
      console.error(`❌ 生成文件失败 ${outputPath}:`, error.message);
      return false;
    }
  }

  // 检查模板是否已加载
  hasTemplate(templateName: string): boolean {
    return this.templates.has(templateName);
  }
}