import * as path from 'path';
import { FileUtil } from 'src/utils/file.util';
import { TemplateEngine } from 'src/engines/template.engine';

export class DatabaseGenerator {
  constructor(private engine: TemplateEngine) {}

  /**
   * 生成 Database 模組
   */
  generateDatabaseModule(config: any) {
    try {
      const moduleName = config.module.name;
      const moduleDir = path.join(process.cwd(), 'generated', moduleName.toLowerCase());
      FileUtil.ensureDirectoryExists(moduleDir);

      const servicesDir = path.join(moduleDir, 'services');
      const configDir = path.join(moduleDir, 'config');
      FileUtil.ensureDirectoryExists(servicesDir);
      FileUtil.ensureDirectoryExists(configDir);

      const templateData = {
        module: {
          ...config.module,
          nameLower: moduleName.toLowerCase(),
          tableName: config.module.tableName || `${moduleName.toLowerCase()}s`
        }
      };

      // 生成 module
      const modulePath = path.join(moduleDir, `${moduleName.toLowerCase()}.module.ts`);
      this.generateFile(modulePath, 'database', 'module', templateData);

      // 生成 service
      const servicePath = path.join(servicesDir, `${moduleName.toLowerCase()}.service.ts`);
      this.generateFile(servicePath, 'database', 'service', templateData);

      // 生成 sequelize config
      const configPath = path.join(configDir, 'sequelize.config.ts');
      this.generateFile(configPath, 'database', 'sequelize-config', templateData);

      console.log(`✅ Database module ${moduleName} 生成完成！`);
    } catch (error: any) {
      console.error(`❌ Database module 生成失败:`, error.message);
    }
  }

  /**
   * 通用生成文件
   */
  private generateFile(outputPath: string, category: string, templateName: string, data: any): boolean {
    try {
      const content = this.engine.render(category, templateName, data);
      FileUtil.writeFile(outputPath, content);
      console.log(`✅ 生成文件: ${outputPath}`);
      return true;
    } catch (error: any) {
      console.error(`❌ 生成文件失败 ${outputPath}:`, error.message);
      return false;
    }
  }
}
