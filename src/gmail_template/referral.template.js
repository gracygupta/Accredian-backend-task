const htmlTemplate = async (data) => {
  return `
       <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Referral Notification</title>
    <style>
        /* Reset CSS */
        body,
        h1,
        h2,
        h3,
        p {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }

        .content {
            padding: 30px;
        }

        .course-info {
            margin-bottom: 20px;
        }

        .course-name {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            margin-bottom: 10px;
        }

        .details {
            font-size: 16px;
            color: #666666;
            line-height: 1.8;
        }

        .cta {
            text-align: center;
            margin-top: 20px;
        }

        .cta a {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            font-weight: bold;
        }

        .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }

        .footer p {
            font-size: 14px;
            color: #666666;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Course Referral Notification</h1>
        </div>
        <div class="content">
            <div class="course-info">
                <h2 class="course-name">${data.course}</h2>
                <p class="details">You've been referred to the course ${data.course} by a friend. Below are the
                    details:</p>
                <ul class="details">
                    <li><strong>Referrer's Email:</strong> ${data.referrer_email}</li>
                    <li><strong>Course Price:</strong> Rs. ${data.price}</li>
                    <li><strong>Referrer Bonus:</strong> Rs. ${data.referrerBonus}</li>
                    <li><strong> Referee Bonus:</strong> Rs. ${data.refereeBonus}</li>
                    <li><strong>Enrolled Referrer Bonus:</strong> Rs. ${data.enrolledReferrerBonus}</li>
                    <li><strong>Enrolled Referee Bonus:</strong> Rs. ${data.enrolledRefereeBonus}</li>
                </ul>
            </div>
            <div class="cta">
                <a href="https://accredian.com/" target="_blank">Explore Course</a>
            </div>
        </div>
        <div class="footer">
            <p>Thank you for using our platform. For any queries, please contact support@accredian.com.</p>
        </div>
    </div>
</body>

</html>`;
};

module.exports = htmlTemplate;
