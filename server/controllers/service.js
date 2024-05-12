const mongoose = require("mongoose");
const Service = require("../models/organisermodel");

const postservice = async (req, res) => {
  const { id: _id } = req.params;
  const { serviceName, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "Service unavailable..." });
  }

  try {
    const updatedOrganization = await Service.findByIdAndUpdate(
      _id,
      {
        $addToSet: {
          services: { serviceName, description, createdAt: new Date() },
        },
      },
      { new: true }
    );
    res.status(200).json(updatedOrganization);
  } catch (error) {
    res.status(500).json({ message: "Error in updating", error });
  }
};

const deleteService = async (req, res) => {
  const { id: _id } = req.params;
  const { serviceId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "Organization unavailable..." });
  }

  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    return res.status(404).json({ message: "Service unavailable..." });
  }

  try {
    const result = await Service.updateOne(
      { _id },
      { $pull: { services: { _id: serviceId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting", error });
  }
};

module.exports = {
  postservice,
  deleteService,
};
