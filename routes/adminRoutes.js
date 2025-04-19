const router = require("express").Router();

const users = [
    {
        id: "u1",
        firstName: "Alice",
        lastName: "Nguyen",
        email: "alice.nguyen@example.com",
        role: "Student",
        date: "02/01/2024",
        coursesStudying: [
            {
                name: "Intro to Data Science",
                author: "John Doe",
                status: "On Going",
            },
            { name: "Excel Basics", author: "Jane Smith", status: "Finished" },
            {
                name: "Web Design Fundamentals",
                author: "Emily Le",
                status: "On Going",
            },
            {
                name: "Critical Thinking",
                author: "Sara Lee",
                status: "Not Start",
            },
        ],
        coursesInstructing: [],
    },
    {
        id: "u2",
        firstName: "Brian",
        lastName: "Tran",
        email: "brian.tran@example.com",
        role: "Instructor",
        date: "15/03/2023",
        coursesStudying: [
            {
                name: "Leadership Essentials",
                author: "John Doe",
                status: "On Going",
            },
            {
                name: "Communication Skills",
                author: "Sara Lee",
                status: "Finished",
            },
            {
                name: "Advanced Excel",
                author: "Jane Smith",
                status: "On Going",
            },
            {
                name: "Time Management",
                author: "David Hoang",
                status: "Not Start",
            },
        ],
        coursesInstructing: [
            {
                name: "Advanced Python",
                author: "Brian Tran",
                status: "On Going",
            },
            {
                name: "Machine Learning 101",
                author: "Brian Tran",
                status: "Finished",
            },
            {
                name: "AI for Everyone",
                author: "Brian Tran",
                status: "On Going",
            },
            {
                name: "Data Analysis with Pandas",
                author: "Brian Tran",
                status: "Not Start",
            },
        ],
    },
    {
        id: "u3",
        firstName: "Chloe",
        lastName: "Pham",
        email: "chloe.pham@example.com",
        role: "Student",
        date: "22/08/2022",
        coursesStudying: [
            {
                name: "Marketing Basics",
                author: "Sara Lee",
                status: "On Going",
            },
            {
                name: "SEO Fundamentals",
                author: "Emily Le",
                status: "Finished",
            },
            {
                name: "Content Writing",
                author: "Jane Smith",
                status: "On Going",
            },
            {
                name: "Social Media Strategies",
                author: "Sara Lee",
                status: "Not Start",
            },
        ],
        coursesInstructing: [],
    },
    {
        id: "u4",
        firstName: "David",
        lastName: "Hoang",
        email: "david.hoang@example.com",
        role: "Instructor",
        date: "10/12/2023",
        coursesStudying: [
            {
                name: "Public Speaking",
                author: "Jane Smith",
                status: "On Going",
            },
            { name: "Team Management", author: "John Doe", status: "Finished" },
            {
                name: "Presentation Skills",
                author: "Emily Le",
                status: "On Going",
            },
            {
                name: "Conflict Resolution",
                author: "Sara Lee",
                status: "Not Start",
            },
        ],
        coursesInstructing: [
            { name: "UI/UX Design", author: "David Hoang", status: "On Going" },
            {
                name: "Design Thinking",
                author: "David Hoang",
                status: "Finished",
            },
            {
                name: "Product Design",
                author: "David Hoang",
                status: "On Going",
            },
            {
                name: "Visual Communication",
                author: "David Hoang",
                status: "Not Start",
            },
        ],
    },
    {
        id: "u5",
        firstName: "Emily",
        lastName: "Le",
        email: "emily.le@example.com",
        role: "Student",
        date: "05/09/2023",
        coursesStudying: [
            {
                name: "Javascript Essentials",
                author: "John Doe",
                status: "On Going",
            },
            { name: "React Basics", author: "Jane Smith", status: "Not Start" },
            {
                name: "Frontend Development",
                author: "Emily Le",
                status: "Finished",
            },
            {
                name: "Responsive Design",
                author: "Sara Lee",
                status: "On Going",
            },
        ],
        coursesInstructing: [],
    },
    {
        id: "u6",
        firstName: "Frank",
        lastName: "Vo",
        email: "frank.vo@example.com",
        role: "Instructor",
        date: "11/07/2022",
        coursesStudying: [
            {
                name: "Project Management",
                author: "John Doe",
                status: "Finished",
            },
            {
                name: "Agile Methodologies",
                author: "Sara Lee",
                status: "On Going",
            },
            { name: "Risk Management", author: "Emily Le", status: "On Going" },
            {
                name: "Leadership Communication",
                author: "Jane Smith",
                status: "Not Start",
            },
        ],
        coursesInstructing: [
            {
                name: "Cybersecurity Fundamentals",
                author: "Frank Vo",
                status: "On Going",
            },
            {
                name: "Network Security",
                author: "Frank Vo",
                status: "Finished",
            },
            { name: "Ethical Hacking", author: "Frank Vo", status: "On Going" },
            {
                name: "Security Best Practices",
                author: "Frank Vo",
                status: "Not Start",
            },
        ],
    },
    {
        id: "u7",
        firstName: "Grace",
        lastName: "Pham",
        email: "grace.pham@example.com",
        role: "Student",
        date: "30/04/2024",
        coursesStudying: [
            {
                name: "Social Media Marketing",
                author: "Sara Lee",
                status: "Finished",
            },
            {
                name: "Brand Strategy",
                author: "Jane Smith",
                status: "On Going",
            },
            {
                name: "Digital Advertising",
                author: "Emily Le",
                status: "On Going",
            },
            {
                name: "Content Creation",
                author: "John Doe",
                status: "Not Start",
            },
        ],
        coursesInstructing: [],
    },
    {
        id: "u8",
        firstName: "Henry",
        lastName: "Nguyen",
        email: "henry.nguyen@example.com",
        role: "Instructor",
        date: "20/06/2023",
        coursesStudying: [
            {
                name: "Advanced Leadership",
                author: "John Doe",
                status: "On Going",
            },
            {
                name: "Creative Problem Solving",
                author: "Sara Lee",
                status: "Finished",
            },
            {
                name: "Strategic Planning",
                author: "Jane Smith",
                status: "On Going",
            },
            {
                name: "Decision Making",
                author: "Emily Le",
                status: "Not Start",
            },
        ],
        coursesInstructing: [
            {
                name: "Backend Development",
                author: "Henry Nguyen",
                status: "Finished",
            },
            {
                name: "Node.js Masterclass",
                author: "Henry Nguyen",
                status: "On Going",
            },
            {
                name: "API Development",
                author: "Henry Nguyen",
                status: "On Going",
            },
            {
                name: "Database Management",
                author: "Henry Nguyen",
                status: "Not Start",
            },
        ],
    },
    {
        id: "u9",
        firstName: "Isabella",
        lastName: "Tran",
        email: "isabella.tran@example.com",
        role: "Student",
        date: "28/11/2023",
        coursesStudying: [
            {
                name: "Public Speaking",
                author: "Jane Smith",
                status: "On Going",
            },
            {
                name: "Interview Techniques",
                author: "Emily Le",
                status: "On Going",
            },
            {
                name: "Confidence Building",
                author: "Sara Lee",
                status: "Finished",
            },
            {
                name: "Persuasion Skills",
                author: "John Doe",
                status: "Not Start",
            },
        ],
        coursesInstructing: [],
    },
    {
        id: "u10",
        firstName: "Jack",
        lastName: "Le",
        email: "jack.le@example.com",
        role: "Instructor",
        date: "13/02/2024",
        coursesStudying: [
            {
                name: "Entrepreneurship Basics",
                author: "Jane Smith",
                status: "Finished",
            },
            {
                name: "Financial Literacy",
                author: "Emily Le",
                status: "On Going",
            },
            { name: "Startup Growth", author: "Sara Lee", status: "On Going" },
            {
                name: "Innovation Strategy",
                author: "John Doe",
                status: "Not Start",
            },
        ],
        coursesInstructing: [
            {
                name: "Entrepreneurship 101",
                author: "Jack Le",
                status: "On Going",
            },
            { name: "Startup Scaling", author: "Jack Le", status: "Finished" },
            {
                name: "Pitching to Investors",
                author: "Jack Le",
                status: "On Going",
            },
            {
                name: "Business Planning",
                author: "Jack Le",
                status: "Not Start",
            },
        ],
    },
];

const institutions = [
    {
        email: "institution@gmail.com",
        password: "Password",
        name: "Institution Name",
        class: 10,
        instructor: 10,
        student: 10,
    },
    {
        email: "institution1@gmail.com",
        password: "Password",
        name: "Institution Name",
        class: 10,
        instructor: 10,
        student: 10,
    },
    {
        email: "institution2@gmail.com",
        password: "Password",
        name: "Institution Name",
        class: 10,
        instructor: 10,
        student: 10,
    },
    {
        email: "institution3@gmail.com",
        password: "Password",
        name: "Institution Name",
        class: 10,
        instructor: 10,
        student: 10,
    },
    {
        email: "institution4@gmail.com",
        password: "Password",
        name: "Institution Name",
        class: 10,
        instructor: 10,
        student: 10,
    },
];

const courses = [
    {
        id: "c1",
        name: "Intro to Data Science",
        author: "John Doe",
        students: 25,
        price: 20,
        date: "03/04/2021",
    },
    {
        id: "c2",
        name: "Advanced Excel",
        author: "Jane Smith",
        students: 30,
        price: 20,
        date: "03/04/2022",
    },
    {
        id: "c3",
        name: "Web Development",
        author: "Emily Le",
        students: 15,
        price: 20,
        date: "03/04/2022",
    },
    {
        id: "c4",
        name: "Marketing Basics",
        author: "Sara Lee",
        students: 40,
        price: 20,
        date: "03/04/2021",
    },
    {
        id: "c5",
        name: "Cybersecurity Fundamentals",
        author: "Frank Vo",
        students: 20,
        price: 20,
        date: "03/04/2022",
    },
    {
        id: "c6",
        name: "Entrepreneurship 101",
        author: "Jack Le",
        students: 18,
        price: 20,
        date: "03/04/2022",
    },
];

const posts = [
    {
        id: "p1",
        author: "John Doe",
        time: "15:00",
        content:
            "Exploring the new features of our platform! Excited to share this with you all.",
        media: "https://via.placeholder.com/400x200",
        likes: 10000,
        commentsCount: 99000,
        comments: [
            {
                avatar: "https://via.placeholder.com/40",
                name: "Alice Nguyen",
                text: "This looks amazing!",
            },
        ],
    },
    {
        id: "p2",
        author: "Jane Smith",
        time: "10:30",
        content:
            "Just finished a new tutorial, hope it helps everyone to get started!",
        media: "https://via.placeholder.com/400x200",
        likes: 2500,
        commentsCount: 4500,
        comments: [
            {
                avatar: "https://via.placeholder.com/40",
                name: "Brian Tran",
                text: "Thanks for sharing!",
            },
        ],
    },
    {
        id: "p3",
        author: "Emily Le",
        time: "18:45",
        content: "Teamwork makes the dream work! 🚀",
        media: "https://via.placeholder.com/400x200",
        likes: 7800,
        commentsCount: 3200,
        comments: [
            {
                avatar: "https://via.placeholder.com/40",
                name: "Grace Pham",
                text: "Absolutely agree!",
            },
        ],
    },
];

router.get("/users", (req, res) => {
    res.render("adminUser", { users, activePage: "users" });
});

router.get("/user/:userId", (req, res) => {
    const { userId } = req.params;
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.render("adminUserDetail", { user, activePage: "users" });
});

router.get("/institutions", (req, res) => {
    res.render("adminInstitution", {
        institutions,
        activePage: "institutions",
    });
});

router.get("/institution/:institutionId", (req, res) => {
    const { institutionId } = req.params;
    const institution = institutions.find(
        (institution) => institution.id === institutionId
    );
    if (!institution) {
        return res.status(404).send("Institution not found");
    }
    res.render("adminInstitutionDetail", {
        institution,
        activePage: "institutions",
    });
});

router.get("/courses", (req, res) => {
    res.render("adminCourse", { courses, activePage: "courses" });
});

router.get("/posts", (req, res) => {
    res.render("adminPost", { posts, activePage: "posts" });
});

module.exports = router;
