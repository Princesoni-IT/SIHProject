export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstMessage = result.error.issues[0]?.message || "Validation failed";
      return res.status(400).json({
        success: false,
        message: firstMessage,
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    req.body = result.data;

    next();
  };
};