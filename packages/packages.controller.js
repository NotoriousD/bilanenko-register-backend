const packagesSchema = require('./packages.models');

exports.getPackages = async (req, res, next) => {
  const packages = await packagesSchema.find({});
  
  if(packages) {
    res.status(200).json(packages);
  }
};

exports.getPackageById = async (req, res, next) => {
    const { course_id } = req.body;

    try {
        const package = await packagesSchema.findById(course_id);

        if(package) {
            req.package = package;
        }

        next();
    } catch(err) {
        res.status(404).send({ message: 'Something went wrong' });
    } 
}