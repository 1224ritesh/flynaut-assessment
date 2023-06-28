const preventCache = (req, res, next) => {

  //this middleware function sets cache control headers to prevent caching of the response. If the user is not authenticated, it allows access to the current route and continues with the request handling. If the user is authenticated, it redirects them to the '/dashboard' route 
  //When a user accesses a protected page or performs actions while logged in, it's important to prevent the browser from caching those pages. If caching is not prevented, the user may still see the protected content even after logging out if they use the browser's back button or access the page from the cache. This is a security risk because it allows other users to view the protected content.
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');

  if (!req.isAuthenticated()) {
    return next();
  }

  res.redirect('/dashboard');
};

export default preventCache;
