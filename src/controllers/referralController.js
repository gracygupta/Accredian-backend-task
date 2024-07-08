const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sendEmail } = require("../config/mail.config");
const Res = require("../service/general.helper");
const http = require("../config/http.config");

const give_referral = async (req, res) => {
  const { name, email, phoneNumber, referredCourseId } = req.body;

  try {
    if (email == req.user.email) {
      return Res(res, http.forbidden_code, "Self referrals are not allowed");
    }
    // Fetch the referred course details
    const course = await prisma.course.findUnique({
      where: { id: parseInt(referredCourseId) },
    });

    if (!course) {
      return Res(res, http.not_found_error, "Course not found");
    }

    // Check if the referral already exists
    const existingReferral = await prisma.referral.findFirst({
      where: {
        email,
        referredCourseId: parseInt(referredCourseId),
      },
    });

    if (existingReferral) {
      return Res(
        res,
        http.bad_request,
        "Referral already exists for this course"
      );
    }

    const newReferral = await prisma.referral.create({
      data: {
        name,
        email,
        phoneNumber,
        referredBy: req.user.id,
        referredCourseId: parseInt(referredCourseId),
      },
    });

    sendEmail({
      email: email,
      course: course.name,
      referrer_email: req.user.email,
      price: course.price,
      enrolledReferrerBonus: course.enrolledReferrerBonus,
      enrolledRefereeBonus: course.enrolledRefereeBonus,
      referrerBonus: course.referrerBonus,
      refereeBonus: course.refereeBonus,
    });

    return Res(res, http.created_code, "Referral Successful", newReferral);
  } catch (error) {
    console.error("Error creating user:", error);
    return Res(res, http.internal_server_error, "Internal server error");
  }
};

const get_all_referrals = async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany({
      include: {
        referredCourse: true,
        referrer: true,
      },
    });

    return Res(
      res,
      http.success_code,
      "Referrals fetched successfully",
      referrals
    );
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return Res(res, http.internal_server_error, "Internal server error");
  }
};

const get_referral = async (req, res) => {
  const { id } = req.params;

  try {
    const referral = await prisma.referral.findUnique({
      where: { id: parseInt(id) },
      include: {
        referredCourse: true,
        referrer: true,
      },
    });

    if (!referral) {
      return Res(res, http.not_found_error, "Referral not found");
    }

    return Res(
      res,
      http.success_code,
      "Referral fetched successfully",
      referral
    );
  } catch (error) {
    console.error("Error fetching referral:", error);
    return Res(res, http.internal_server_error, "Internal server error");
  }
};

const delete_referral = async (req, res) => {
  const { id } = req.params;

  try {
    const referral = await prisma.referral.findUnique({
      where: { id: parseInt(id) },
    });

    if (!referral) {
      return Res(res, http.not_found_error, "Referral not found");
    }

    await prisma.referral.delete({
      where: { id: parseInt(id) },
    });

    return Res(res, http.success_code, "Referral deleted successfully");
  } catch (error) {
    console.error("Error deleting referral:", error);
    return Res(res, http.internal_server_error, "Internal server error");
  }
};

module.exports = {
  give_referral,
  get_all_referrals,
  get_referral,
  delete_referral,
};
