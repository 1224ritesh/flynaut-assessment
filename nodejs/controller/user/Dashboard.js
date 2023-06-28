import User from "../../modules/User.js";
import Address from "../../modules/Address.js";


// this class is used to render the dashboard page after login and also to update the user details and address details in the database.
// the get method is used to render the dashboard page and the post method is used to update the user details and address details in the database.
class Dashboard {
  async get(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id });
      if (!user) {
        throw new Error("user not found");
      }

      const address = await Address.findOne({ uid: req.user._id });
      if (!address) {
        throw new Error("address not found");
      }

      const adr = await Address.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "uid",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $match: { uid: req.user._id } },
      ]);

      res.render("dashboard", {
        csrfToken: req.csrfToken(),
        promiseResult: [user, address],
        aggregateLookupResult: adr,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("promise rejected");
    }
  }

  post(req, res) {

  }
}

export default new Dashboard();

