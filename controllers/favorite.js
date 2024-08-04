const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Favorite = require("../models/Favorite");

const fetch = require("node-fetch");
const {
  getOrderCommerce,
  getOrderTruck,
  getOrderTransport,
  refresh,
  addUserOrderCommerce,
  removeUserOrderCommerce,
  removeUserOrderTruck,
  addUserOrderTruck,
  refreshGC,
  refreshTruck
} = require("../utils/request");

// ! OK

exports.createFavoriteOrder = asyncHandler(async (req, res, next) => {
  const {orderId,type} = req.body;
  let isCommerce=false
  let isTruck=false

  const isFavoriteAlready = await Favorite.findOne({
    $and: [
      {
        orderId: orderId,
      },
      {
        "user._id": req.user._id,
      },
      {
        isActive:true
      }
    ],
  });

  if(isFavoriteAlready){
    return next(new ErrorResponse("You already favorite thisOrder",403)) //
  }

  const user = {
    _id: req.user._id,
    username: req.user.username,
    pictureProfile: req.user.pictureProfile,
    phone: req.user.phone,
  };
  
  if(type=="commerce"){
       
      await addUserOrderCommerce(req.user._id,orderId)
      isCommerce=true
  }
  if(type=="truck"){
      await addUserOrderTruck(req.user._id,orderId)
      isTruck=true
  }
  const favorite = await Favorite.create({
    user,
    orderId,
    type,
  });

  await refresh();
  if(isCommerce){
    await refreshGC()
  }
  if(isTruck){
  await refreshTruck()
  }
  res.status(200).json({
    success: true,
    data: favorite,
  });
});

exports.getFavoriteUserOrder = asyncHandler(async (req, res, next) => {
  const favoriteOrders = await Favorite.find({
    $and: [{ "user._id": req.user._id }, { isActive: true }],
  });
  console.log("fffff", favoriteOrders);
  if (!favoriteOrders || favoriteOrders.length == 0) {
    return res.status(200).json({
      success: true,
      data: [],
    });
  }
  const favoriteLength = favoriteOrders.length;

  const data = [];
  favoriteOrders.forEach(async (item) => {
    if (item.type === "commerce") {
      const commerceFavoriteOrder = await getOrderCommerce(item.orderId);

      const obj = { order: commerceFavoriteOrder, id: item._id,type:"commerce"};

      data.push(obj);
    }
    if (item.type === "truck") {
      const truckFavoriteOrder = await getOrderTruck(item.orderId);
      const obj = { order: truckFavoriteOrder, id: item._id ,type:"truck"};
      data.push(obj);
    }
    if (item.type === "transport") {
      const transportFavoriteOrder = await getOrderTransport(item.orderId);
      const obj = { order: transportFavoriteOrder, id: item._id ,type:"transport"};
      data.push(obj);
    }
    if (data.length >= favoriteLength) {
      res.status(200).json({
        success: true,
        data: data,
      });
    }
  });

  // return next (new ErrorResponse("server side Error",500))
});
exports.deleteFavoriteOrder = asyncHandler(async (req, res, next) => {
  let isCommerce=false
  let isTruck=false
  const favorite = await Favorite.findOne({
    $and: [{ orderId: req.params.id }, { isActive: true },{ "user._id": req.user._id }],
  });
  
  console.log(favorite);
  
  if (!favorite) {
    return next(new ErrorResponse("Order not found", 404));
  }

  const type=favorite.type
  console.log(type);
  

  if(type=="commerce"){
       await removeUserOrderCommerce(req.user._id,req.params.id)
       isCommerce=true
  }
  if(type=="truck"){
       await removeUserOrderTruck(req.user._id,req.params.id)
       isTruck=true
  }


  favorite.isActive = false;

  await favorite.save();

  await refresh();

  await refresh();
  if(isCommerce){
    await refreshGC()
  }
  if(isTruck){
  await refreshTruck()
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
exports.getFavoriteUserOrderAdmin = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const isAdmin = req.user.group.includes("admin");
  const isSuperAdmin = req.user.group.includes("superAdmin");
  if (!isAdmin && !isSuperAdmin) {
    return next(new ErrorResponse("you dont have access to this route", 401));
  }

  const favoriteOrders = await Favorite.find({
    "user._id": userId,
  });

  // console.log("ffffff",favoriteOrders);
  

  const favoriteLength = favoriteOrders.length;
  console.log(favoriteLength);
  if(favoriteLength==0){
    return res.status(200).json({success:true,data:[]
    })
  }
  const data = [];
  favoriteOrders.forEach(async (item) => {
    if (item.type === "commerce") {
      const commerceFavoriteOrder = await getOrderCommerce(item.orderId);
      const obj = {
        isActive: item.isActive,
        order: commerceFavoriteOrder,
        id: item._id,
      };
      data.push(obj);
    }
    if (item.type === "truck") {
      const truckFavoriteOrder = await getOrderTruck(item.orderId);
      const obj = {
        isActive: item.isActive,
        order: truckFavoriteOrder,
        id: item._id,
      };
      data.push(obj);
    }
    if (item.type === "transport") {
      const transportFavoriteOrder = await getOrderTransport(item.orderId);
      const obj = {
        isActive: item.isActive,
        order: transportFavoriteOrder,
        id: item._id,
      };
      data.push(obj);
    }
    if (data.length >= favoriteLength) {
      return res.status(200).json({
        success: true,
        data: data,
      });
    }
  });
  // return next (new ErrorResponse("server side Error",500))
});
