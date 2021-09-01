export function getQueryPrms(){
  const searchParams = new URLSearchParams(window.location.search);
  const params = {}
  searchParams.forEach(function(value, key) {
    params[key] = value
  });
  return params;
}
