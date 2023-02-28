// https://angular.io/guide/build#proxying-to-a-backend-server

export default [
  {
    context: ['/api', '/cloudapi'],
    target: 'http://localhost:3333',
    secure: false, // [vite] http proxy error: Error: self signed certificate in certificate chain
    changeOrigin: true,
  },
];
