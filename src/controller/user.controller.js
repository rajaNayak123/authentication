import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js"; // Ensure you have this function


const registerUser = async (req, res) => {
  try {
    const { name, email, password, bio, address } = req.body;

    // Validate required fields
    if ([name, email, password, address].some((field) => !field?.trim())) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

   // this files provide multer
   const avtarLoclapath = req.files?.avatar[0]?.path || "there is no file";
   console.log("avatar path",avtarLoclapath);
   // const coverImageLocalpath = req.files?.coverImage[0]?.path;
 
   if (!avtarLoclapath) {
     throw new ApiError(400, "avatar file is required");
   }
 
   // upload the image and avatar into the cloudinary
   const avatar = await uploadCloudinary(avtarLoclapath);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      bio,
      address,
      avatar: avatar.url,
    });

    await newUser.save();

    // Generate authentication token
    const token = newUser.generateAuthToken();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ mesage: "Email is required" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isMatch = await user.isCorrectPassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Password is incorrect" });
  }

  const token = await user.generateAuthToken();

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.status(200).cookie("token", token, options).json({ user, token });
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, bio, address } = req.body;
    let avatarUrl = undefined;

    if (req.files?.avatar) {
      const avatarPath = req.files.avatar[0]?.path;
      if (avatarPath) {
        const avatar = await uploadCloudinary(avatarPath);
        avatarUrl = avatar.url;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        bio,
        address,
        ...(avatarUrl && { avatar: avatarUrl }),
      },
      { new: true, runValidators: true, select: "-password" }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export { registerUser, loginUser, getProfile, updateProfile };
