import * as handlebars from 'handlebars';
import * as path from 'path';
import * as fs from 'fs';
import { FileUtil } from '../utils/file.util';

// ======================
// Handlebars Helpers
// ======================
handlebars.registerHelper('toLowerCase', (str: string) => str.toLowerCase());
handlebars.registerHelper('toUpperCase', (str: string) => str.toUpperCase());
handlebars.registerHelper('eq', (a: any, b: any) => a === b);

// Sequelize 数据类型映射
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

// TypeScript 类型映射
handlebars.registerHelper('toTsType', (type: string) => {
  const typeMap: { [key: string]: string } = {
    int: 'number',
    integer: 'number',
    string: 'string',
    str: 'string',
    text: 'string',
    datetime: 'Date',
    date: 'Date',
    boolean: 'boolean',
    bool: 'boolean'
  };
  return typeMap[type.toLowerCase()] || 'any';
});

// ======================
// TemplateEngine
// ======================
export class TemplateEngine {
  private templatesByCategory: Map<string, Map<string, handlebars.TemplateDelegate>> = new Map();
  private templateDir: string;

  constructor(templateDir?: string) {
    // 可以自定義模板目錄，否則默認使用項目根 templates 文件夾
    this.templateDir = templateDir || path.join(process.cwd(), 'templates');
    console.log('📁 模板目录:', this.templateDir);
  }

  // ======================
  // 掃描模板目錄
  // ======================
  private scanDirForHbs(dirPath: string): string[] {
    let results: string[] = [];
    if (!fs.existsSync(dirPath)) return results;

    const items = fs.readdirSync(dirPath);
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(this.scanDirForHbs(fullPath));
      } else if (stat.isFile() && item.endsWith('.hbs')) {
        results.push(fullPath);
      }
    });

    return results;
  }

  // ======================
  // 加載模板
  // ======================
  loadAllTemplates(): boolean {
    console.log('🔄 加载模板文件...');
    this.templatesByCategory.clear();

    const hbsFiles = this.scanDirForHbs(this.templateDir);

    hbsFiles.forEach(filePath => {
      const relativePath = path.relative(this.templateDir, filePath);
      const parts = relativePath.split(path.sep);
      const category = parts.length > 1 ? parts[0] : 'default';
      const name = parts[parts.length - 1].replace(/\.hbs$/, '');
      const templateContent = fs.readFileSync(filePath, 'utf-8');
      const template = handlebars.compile(templateContent);

      if (!this.templatesByCategory.has(category)) this.templatesByCategory.set(category, new Map());
      this.templatesByCategory.get(category)!.set(name, template);

      console.log(`✅ 加载模板: ${category}/${name}`);
    });

    const totalTemplates = Array.from(this.templatesByCategory.values())
                                .reduce((acc, map) => acc + map.size, 0);
    if (totalTemplates > 0) {
      console.log(`✅ 成功加载 ${totalTemplates} 个模板`);
      return true;
    } else {
      console.error('❌ 没有加载任何模板文件！');
      this.showAvailableTemplates();
      return false;
    }
  }

  // ======================
  // 列出模板
  // ======================
  listTemplates(category?: string): string[] {
    if (category) {
      return Array.from(this.templatesByCategory.get(category)?.keys() || []);
    }
    return Array.from(this.templatesByCategory.entries())
                .flatMap(([cat, map]) => Array.from(map.keys()).map(name => `${cat}/${name}`));
  }

  // ======================
  // 渲染模板
  // ======================
  render(category: string, templateName: string, data: any): string {
    const categoryMap = this.templatesByCategory.get(category);
    if (!categoryMap) throw new Error(`模板分类 ${category} 不存在`);
    
    // Get the template first
    const template = categoryMap.get(templateName);
    if (!template) throw new Error(`模板 ${category}/${templateName} 未加载`);

    // Prepare the template data with proper strategies handling
    const templateData = {
      ...data,
      // Ensure strategies is alway s an array for the template
      strategies: data.strategies || [],
      // Add helper flags for templates
      hasStrategies: data.strategies && data.strategies.length > 0
    };

    // Debug logging
    if (templateData.hasStrategies) {
      console.log(`🔄 Processing template '${templateName}' with ${templateData.strategies.length} strategies`);
      // templateData.strategies.forEach((strategy: any) => {
      //   console.log(`  - ${strategy.name}: ${strategy.description}`);
      //   strategy.name = strategy.name.replace(/[-_]/g, '');
      // });
    }

    return template(templateData);
  }

  // ======================
  // 生成文件
  // ======================
  generateFile(outputPath: string, category: string, templateName: string, data: any): boolean {
    try {
      const content = this.render(category, templateName, data);
      FileUtil.writeFile(outputPath, content);
      console.log(`✅ 生成文件: ${outputPath}`);
      return true;
    } catch (error: any) {
      console.error(`❌ 生成文件失败 ${outputPath}:`, error.message);
      return false;
    }
  }


  

  // ======================
  // 重新加載模板
  // ======================
  reloadTemplates() {
    console.log('🔄 重新加載模板...');
    return this.loadAllTemplates();
  }

  // ======================
  // 顯示模板目錄
  // ======================
  private showAvailableTemplates(): void {
    console.log('🔍 模板目录结构:');
    this.scanDir(this.templateDir, 0);
  }

  private scanDir(dirPath: string, depth: number): void {
    try {
      if (!fs.existsSync(dirPath)) return;

      const items = fs.readdirSync(dirPath);
      const indent = '  '.repeat(depth);
      
      items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          console.log(`${indent}📁 ${item}/`);
          this.scanDir(fullPath, depth + 1);
        } else if (stat.isFile() && item.endsWith('.hbs')) {
          console.log(`${indent}📄 ${item} (模板)`);
        } else if (stat.isFile()) {
          console.log(`${indent}📄 ${item}`);
        }
      });

      if (items.length === 0) {
        console.log(`${indent}📁 (空目录)`);
      }

    } catch (error: any) {
      console.error(`无法扫描目录 ${dirPath}:`, error.message);
    }
  }

  // ======================
  // 檢查模板是否已加載
  // ======================
  hasTemplate(category: string, templateName: string): boolean {
    return this.templatesByCategory.get(category)?.has(templateName) || false;
  }
}
