import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';
import { TemplateEngine } from './engines/template.engine';
import { FileUtil } from './utils/file.util';
import { Logger } from './utils/logger.util';
import { DatabaseGenerator } from './engines/database-generator';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
interface StrategyConfig {
  name: string;
  description?: string;
}
// 配置类型定义
interface FieldConfig {
  name: string;
  type: string;
  required?: boolean;
  primary_key?: boolean;
  max_length?: number;
  enum?: string[];
}

interface ModuleConfig {
  name: string;
  description?: string;
  tableName?: string;
  fields: FieldConfig[];
  generate_service?: boolean;
  strategies?: StrategyConfig[];
}

/**
 * 获取所有 YAML 配置文件
 */
function getAllConfigFiles(): string[] {
  const examplesDir = path.join(process.cwd(), 'examples');
  
  if (!fs.existsSync(examplesDir)) {
    Logger.warning('examples 目录不存在');
    return [];
  }

  try {
    const files = fs.readdirSync(examplesDir);
    const yamlFiles = files.filter(file => 
      file.endsWith('.yml') || file.endsWith('.yaml')
    ).map(file => path.join(examplesDir, file));

    Logger.info(`找到 ${yamlFiles.length} 个配置文件`);
    return yamlFiles;
  } catch (error) {
    Logger.error(`读取 examples 目录失败: ${error.message}`);
    return [];
  }
}

/**
 * 从单个配置文件生成代码
 */
async function generateFromConfig(configPath: string, engine: TemplateEngine): Promise<boolean> {
  try {
    Logger.info(`处理配置文件: ${path.basename(configPath)}`);
    Logger.info('-'.repeat(40));

    // 读取并解析YAML配置
    const configContent = FileUtil.readFile(configPath);
    const config = yaml.load(configContent) as { module: ModuleConfig };

    // 验证配置结构
    if (!config || !config.module) {
      Logger.error('配置文件格式错误：缺少 module 字段');
      return false;
    }

    if (!config.module.name) {
      Logger.error('配置文件错误：module.name 字段是必需的');
      return false;
    }

    if (!config.module.fields || config.module.fields.length === 0) {
      Logger.error('配置文件错误：module.fields 字段不能为空');
      return false;
    }

    const moduleConfig = config.module;
    const moduleName = moduleConfig.name;
    const moduleNameLower = moduleName.toLowerCase();
    const outputDir = path.join(process.cwd(), 'generated', moduleNameLower);

    // 准备模板数据
    const templateData = {
      module: {
        ...moduleConfig,
        nameLower: moduleNameLower,
        tableName: moduleConfig.tableName || `${moduleNameLower}s`
      }
    };

    Logger.info(`模块名称: ${moduleName}`);
    Logger.info(`数据表名: ${templateData.module.tableName}`);
    Logger.info(`字段数量: ${moduleConfig.fields.length}`);

    // 创建输出目录
    FileUtil.ensureDirectoryExists(outputDir);

    // 定义要生成的文件列表
    const filesToGenerate = [
      { template: 'module', filename: `${moduleNameLower}.module.ts`, description: 'NestJS模块文件' },
      { template: 'model', filename: `${moduleNameLower}.model.ts`, description: 'Sequelize模型文件' },
      { template: 'dto', filename: `${moduleNameLower}.dto.ts`, description: '数据传输对象文件' },
      { template: 'service', filename: `${moduleNameLower}.service.ts`, description: '服务层文件' },
      { template: 'controller', filename: `${moduleNameLower}.controller.ts`, description: '控制器文件' },
      { template: 'repository', filename: `${moduleNameLower}.repository.ts`, description: '仓库层文件' },
      // { template: 'strategies', filename: `${moduleNameLower}.strategies.ts`, description: '策略文件' },
      
    ];

    // 生成所有文件
    let successCount = 0;
    
    filesToGenerate.forEach(file => {

      console.log(file.filename.includes('database'));
      if(file.filename.includes('database')){
        // const outputPath = path.join(outputDir+'/'+file.template+'s/'+file.filename);
        const generator = new DatabaseGenerator(engine);
        generator.generateDatabaseModule(config);
        successCount++;
        
      }
      
      else{
        if (!engine.hasTemplate(file.template,file.template)) {
          Logger.warning(`跳过 ${file.description} (模板未加载: ${file.template})`);
          return;
        }
  
        const outputPath = path.join(outputDir+'/'+file.template+'s/'+file.filename);
        const success = engine.generateFile(outputPath, file.template, file.template, templateData);
        if (success) successCount++;
        // ---- 新增策略生成 ----
        if (moduleConfig.strategies && moduleConfig.strategies.length > 0) {
          const strategiesDir = path.join(outputDir, 'strategies');
          FileUtil.ensureDirectoryExists(strategiesDir);
  
          // 生成 factory
          if (engine.hasTemplate('strategies', 'strategy-factory')) {
            const factoryPath = path.join(strategiesDir, `${moduleNameLower}-strategy.factory.ts`);
            engine.generateFile(factoryPath, 'strategies', 'strategy-factory', templateData);
          }
  
          // 生成 interface
          if (engine.hasTemplate('strategies', 'strategy-interface')) {
            const interfacePath = path.join(strategiesDir, `${moduleNameLower}-strategy.interface.ts`);
            engine.generateFile(interfacePath, 'strategies', 'strategy-interface', templateData);
          }
  
          // 生成每個策略
          moduleConfig.strategies.forEach(strategy => {
            if (engine.hasTemplate('strategies', 'strategy')) {
              const strategyPath = path.join(strategiesDir, `${strategy.name.toLowerCase()}.strategy.ts`);
              const strategyData = { ...templateData, strategy };
              engine.generateFile(strategyPath, 'strategies', 'strategy', strategyData);
            }
          });
        }
        if (success) successCount++;
  
      }
        


    });
    
    

    // 显示生成结果
    if (successCount > 0) {
      Logger.success(`✅ ${moduleName} 模块生成完成 (${successCount}个文件)`);
      Logger.info(`输出目录: ${outputDir}`);
    } else {
      Logger.error(`❌ ${moduleName} 模块生成失败`);
    }

    Logger.info('-'.repeat(40));
    return successCount > 0;

  } catch (error) {
    Logger.error(`处理配置文件 ${configPath} 失败: ${error.message}`);
    return false;
  }
}

/**
 * 主函数 - 代码生成入口点
 */
async function main() {
  try {
    Logger.info('🚀 开始生成代码...');
    Logger.info('='.repeat(50));

    // 1. 获取所有配置文件
    const configFiles = getAllConfigFiles();
    
    if (configFiles.length === 0) {
      Logger.error('没有找到任何配置文件');
      Logger.info('请在 examples/ 目录下创建 .yml 或 .yaml 文件');
      return;
    }

    // 2. 初始化模板引擎
    const engine = new TemplateEngine();
    
    // 3. 加载所有模板文件
    Logger.info('-'.repeat(30));
    const templatesLoaded = engine.loadAllTemplates();
    
    if (!templatesLoaded) {
      Logger.error('没有模板被加载，无法生成代码');
      return;
    }

    // 4. 处理每个配置文件
    let totalSuccess = 0;
    let totalFailed = 0;

    for (const configFile of configFiles) {
      const success = await generateFromConfig(configFile, engine);
      if (success) {
        totalSuccess++;
      } else {
        totalFailed++;
      }
    }

    // 5. 显示最终结果
    Logger.info('='.repeat(50));
    Logger.info('🎯 代码生成汇总:');
    Logger.info(`✅ 成功: ${totalSuccess} 个模块`);
    Logger.info(`❌ 失败: ${totalFailed} 个模块`);
    Logger.info(`📊 总计: ${configFiles.length} 个配置文件`);

    if (totalSuccess > 0) {
      Logger.success('代码生成完成！');
    } else {
      Logger.error('所有模块生成失败');
    }

  } catch (error) {
    Logger.error(`生成失败: ${error.message}`);
  }
}

/**
 * 从特定配置文件生成代码
 */
async function generateFromSpecificConfig(configPath: string): Promise<void> {
  try {
    if (!FileUtil.fileExists(configPath)) {
      Logger.error(`配置文件不存在: ${configPath}`);
      return;
    }

    const engine = new TemplateEngine();
    const templatesLoaded = engine.loadAllTemplates();
    
    if (!templatesLoaded) {
      Logger.error('没有模板被加载，无法生成代码');
      return;
    }

    await generateFromConfig(configPath, engine);

  } catch (error) {
    Logger.error(`生成失败: ${error.message}`);
  }
}

/**
 * 显示使用帮助
 */
function showHelp(): void {
  Logger.info('使用方式:');
  Logger.info('  npx ts-node src/main.ts                    # 生成所有模块');
  Logger.info('  npx ts-node src/main.ts <config-file>      # 生成指定模块');
  Logger.info('  npx ts-node src/main.ts --help             # 显示帮助');
  Logger.info('');
  Logger.info('配置文件路径: examples/*.yml');
  Logger.info('模板文件路径: templates/');
  Logger.info('输出文件路径: generated/');
}

// 命令行参数处理
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

// 如果指定了配置文件，只生成该文件
if (args.length > 0 && !args[0].startsWith('-')) {
  const configPath = path.resolve(args[0]);
  Logger.info(`生成指定配置文件: ${configPath}`);
  generateFromSpecificConfig(configPath).then(() => {
    process.exit(0);
  });
} else {
  // 否则生成所有配置文件
  main().catch(error => {
    Logger.error(`未处理的错误: ${error.message}`);
    process.exit(1);
  });
}



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 如果需要跨域
  await app.listen(3000);
  console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();