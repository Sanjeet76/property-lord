import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listingItem = {
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      regularPrice: req.body.regularPrice,
      discountPrice: req.body.discountPrice,
      bathrooms: req.body.bathrooms,
      bedrooms: req.body.bedrooms,
      furnished: req.body.furnished,
      parking: req.body.parking,
      type: req.body.type,
      offer: req.body.offer,
      userRef: "660f200bee92bac0cbfa6903",
      imageUrls: [
        "https://firebasestorage.googleapis.com/v0/b/mern-estate-f8f18.appspot.com/o/1712272216988t0.jpg?alt=media&token=00f33618-2257-43a5-862a-e87dc6738fe5",
        "https://firebasestorage.googleapis.com/v0/b/mern-estate-f8f18.appspot.com/o/1712272216989t3.png?alt=media&token=3f469856-2496-4538-a603-64a2d78f23a8",
        "https://firebasestorage.googleapis.com/v0/b/mern-estate-f8f18.appspot.com/o/1712272216989t4.png?alt=media&token=14453d87-7331-493b-8c08-f307b7ec4485",
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await new Listing(listingItem).save();
    return res.status(201).json(listingItem);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted successfully!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing Not Found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({
        [sort]: order,
      })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
