import App from '../models/Application-model';
import '../database/connection';

/**
 * @return { Boolean }
 */
async function isSetup() {
  const { firstTimeSetup } = await App.findOne();
  return firstTimeSetup;
}

export { isSetup };
