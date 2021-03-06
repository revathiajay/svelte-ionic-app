import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import dev from 'rollup-plugin-dev';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [

        copy({
            targets: [{ src: 'src/pages/ionic/*', dest: 'public/assets/src' }],
            verbose: true,
            copyOnce: true
        }),

        copy({
            targets: [{ src: 'src/assets/*', dest: 'public/assets' }],
            verbose: true,
            copyOnce: true
        }),
        svelte({
            // enable run-time checks when not in production
            dev: !production,
            // we'll extract any component CSS out into
            // a separate file — better for performance
            css: css => {
                css.write('public/build/bundle.css');
            }
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In 
        // some cases you'll need additional configuration —
        // consult the documentation for details:
        // https://github.com/rollup/rollup-plugin-commonjs
        resolve({
            browser: true,
            dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
        }),
        commonjs({
            namedExports: {
                'node_modules/idb/build/idb.js': ['openDb']
            }
        }),
        // In dev mode, call `npm run start` once
        // the bundle has been generated

        // no service worken in dev
        !production && del({ targets: 'public/sw.js' }), !production && copy({
            targets: [{ src: 'src/sw.js', dest: 'public/' }],
            verbose: true
        }),

        !production && serve2(),

        dev({ dirs: ['public'], spa: 'public/index.html' }),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};

function serve2() {
    let started = false;

    return {
        writeBundle() {
            if (!started) {
                started = true;

                require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true
                });
            }
        }
    };
}