import App from '../models/Application-model';
/**
 * @return { Boolean }
 */
async function isSetup() {
  const query = await App.findOne().select('firstTimeSetup');
  return query.exec(function(err, app) {
    if (err) return handleError(err);
    return app.firstTimeSetup;
  });
}
console.log(isSetup());
export { isSetup };
