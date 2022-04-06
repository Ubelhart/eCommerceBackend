export default function isAdmin(req, res, next) {
  if (req.headers.admin === "true") {
    next();
  } else {
    res.status(401).json({ error: "No autorizado" });
  }
}
