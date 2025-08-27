const { defineConfig } = require("cypress");
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const reportsDir = 'cypress/reports';
const screenshotsDir = 'cypress/screenshots';

const getFormattedTimestamp = () => {
    const now = new Date();
    return [
        String(now.getDate()).padStart(2, '0'),
        String(now.getMonth() + 1).padStart(2, '0'),
        now.getFullYear(),
        String(now.getHours()).padStart(2, '0'),
        String(now.getMinutes()).padStart(2, '0'),
        String(now.getSeconds()).padStart(2, '0')
    ].join('-');
};

module.exports = defineConfig({
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: reportsDir,
        overwrite: false,
        html: false,
        json: true,
        charts: true,
        reportPageTitle: 'Educabot QA Report',
        embeddedScreenshots: true,
        inlineAssets: true
    },
    e2e: {
        setupNodeEvents(on, config) {
            on('before:run', async () => {
                if (fs.existsSync(reportsDir)) {
                    for (const file of await fsp.readdir(reportsDir)) {
                        if (file.endsWith('.json') && file.startsWith('mochawesome_')) {
                            await fsp.unlink(path.join(reportsDir, file));
                            console.log(`🗑️ [REPORT CLEANUP] Eliminado: ${file}`);
                        }
                    }
                }
            });

            on('after:screenshot', (details) => {
                const screenshotPath = details.path;
                const screenshotDir = path.dirname(screenshotPath);
                const screenshotFile = path.basename(screenshotPath);

                if (screenshotDir !== screenshotsDir &&
                    screenshotDir.startsWith(screenshotsDir)) {

                    const timestamp = getFormattedTimestamp();
                    const newFileName = `screenshot_${timestamp}_${screenshotFile}`;
                    const newPath = path.join(screenshotsDir, newFileName);

                    fs.renameSync(screenshotPath, newPath);
                    console.log(`Movida: ${newFileName}`);

                    try {
                        if (fs.existsSync(screenshotDir)) {
                            const files = fs.readdirSync(screenshotDir);
                            if (files.length === 0) {
                                fs.rmdirSync(screenshotDir, { recursive: true });
                                console.log(`Carpeta eliminada: ${screenshotDir}`);
                            }
                        }
                    } catch (error) {
                        console.warn(`No se pudo eliminar: ${screenshotDir}`, error);
                    }

                    return { path: newPath };
                }
                return { path: screenshotPath };
            });

            // Reporte final
            on('after:run', async () => {
                const { merge } = require('mochawesome-merge');
                const { create } = require('mochawesome-report-generator');

                try {
                    const jsonReport = await merge({
                        files: [`${reportsDir}/mochawesome_*.json`],
                    });

                    const timestamp = getFormattedTimestamp();
                    const reportFilename = `mochawesome-report_${timestamp}`;

                    await create(jsonReport, {
                        reportDir: reportsDir,
                        reportFilename,
                        overwrite: false,
                        saveJson: false, 
                        charts: true,
                        embeddedScreenshots: true,
                        inlineAssets: true
                    });

                    console.log(`Reporte Generado: ${reportsDir}/${reportFilename}.html`);

                    for (const file of await fsp.readdir(reportsDir)) {
                        if (file.endsWith('.json') && file.startsWith('mochawesome_')) {
                            await fsp.unlink(path.join(reportsDir, file));
                            console.log(`Reporte eliminado: ${file}`);
                        }
                    }
                } catch (error) {
                    console.error('No se pudo generar reporte:', error);
                }
            });

            on('before:browser:launch', (browser, launchOptions) => {
                if (browser.name === 'chrome' || browser.name === 'edge') {
                    launchOptions.args.push('--disable-password-manager-reauthentication');
                    launchOptions.args.push('--disable-features=PasswordCheck');
                }
                return launchOptions;
            });

            return config;
        },

        baseUrl: "https://www.saucedemo.com/",
        username: "standard_user",
        password: "secret_sauce",
        screenshotOnRunFailure: true,
        trashAssetsBeforeRuns: false,

        blockHosts: [
            'accounts.google.com',
            'password-manager.google.com'
        ]
    }
});
