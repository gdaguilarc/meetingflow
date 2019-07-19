import App from '../models/Application-model';

/**
 * @return { Boolean }
 */
async function isSetup() {
  const { firstTimeSetup } = await App.findOne();
  return firstTimeSetup;
}

export { isSetup };
