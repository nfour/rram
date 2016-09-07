import Promise from 'bluebird';

export const getExampleText = async () => {
  await Promise.delay(200);

  return 'Sourced Text!';
};
