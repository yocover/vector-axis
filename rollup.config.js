export default {
    input: 'src/Axis.js',
    output: [
        {
            format: 'umd',
            name: 'Axis',
            file: 'build/axis.js',
            indent: '\t',
        },
        {
            format: 'es',
            name: 'Axis',
            file: 'build/axis.module.js',
            indent: '\t',
        },
    ],
};
