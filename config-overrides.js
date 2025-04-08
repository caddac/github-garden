module.exports = function override(config, env) {
  // Add YAML loader
  config.module.rules.push({
    test: /\.ya?ml$/,
    use: 'raw-loader',
  });

  return config;
}; 