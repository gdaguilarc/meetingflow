import App from '../models/Application-model';

/**
 * @return { Boolean }
 */
async function isSetup() {
  return await App.findOne({ firstTimeSetup });
}

export default isSetup;
