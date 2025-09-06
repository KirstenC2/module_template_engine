import chalk from 'chalk';

export class Logger {
  static success(message: string): void {
    console.log(chalk.green('✅', message));
  }

  static error(message: string): void {
    console.log(chalk.red('❌', message));
  }

  static info(message: string): void {
    console.log(chalk.blue('📝', message));
  }

  static warning(message: string): void {
    console.log(chalk.yellow('⚠️', message));
  }

  static fileGenerated(path: string): void {
    console.log(chalk.green('📄'), chalk.blue(path));
  }

  static fileSkipped(path: string): void {
    console.log(chalk.yellow('⏭️'), chalk.gray(path));
  }
}