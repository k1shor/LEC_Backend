const { check, validationResult, body } = require('express-validator')

exports.addCategoryRules = [
    body('category_name').notEmpty().withMessage("Category name is required")
        .isLength({ min: 3 }).withMessage("Category must be at least 3 characters")
]

exports.editCategoryRules = [
    check('category_name').optional()
        .isLength({ min: 3 }).withMessage("Category must be at least 3 characters")
]

exports.validationMethod = (req, res, next) => {
    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next()
}

exports.addProductRules = [
    check('product_name').notEmpty().withMessage("Product name is required")
        .isLength({ min: 3 }).withMessage("Product name must be at least 3 characters"),
    check('product_price').notEmpty().withMessage("product price is required")
        .isNumeric().withMessage("Price must be a number"),
    check('product_description').notEmpty().withMessage("Description is required")
        .isLength({ min: 20 }).withMessage("Description must be at least 20 characters"),
    check('count_in_stock').notEmpty().withMessage("Count in stock is required")
        .isNumeric().withMessage("Count must be a number"),
    check('category').notEmpty().withMessage("Category is required")
        .isMongoId().withMessage("Invalid category")
]

exports.userRegisterRules = [
    check('username').notEmpty().withMessage("Username is required")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters")
        .not().isIn(['USER', 'admin', "ADMIN", "GOD", "DOG"]).withMessage("Invalid username"),
    check('email').notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email format invalid"),
    check('password').notEmpty().withMessage("Password is required")
        .matches(/[a-z]/).withMessage("Password must consist of at least 1 lowercase alphabet")
        .matches(/[A-Z]/).withMessage("Password must consist of at least 1 uppercase alphabet")
        .matches(/[0-9]/).withMessage("Password must consist of at least 1 number")
        .matches(/[!@#$%_]/).withMessage("Password must consist of at least special character")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
        .isLength({ max: 30 }).withMessage("Password must be not exceed 30 characters")
]