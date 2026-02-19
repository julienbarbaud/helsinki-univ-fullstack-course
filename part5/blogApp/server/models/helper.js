const formatJson = (schema) => {
  schema.set('toJSON', {
    virtuals: true,
    /* eslint-disable no-param-reassign */
    transform: (before, after) => {
      delete after._id;
      delete after.__v;
    },
    /* eslint-enable no-param-reassign */
  });
};

module.exports = { formatJson };
