import { ref } from "vue";

export const useApi = () => {
  const config = useRuntimeConfig();
  const store = useStore();
  const baseURL = config.public.apiUrl;

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2F1dGhlbnRpY2F0aW9uIjoiZTQyNDM3NDctMjk4NS00YzgwLTg5ZjQtNTQ1ZDFhMGZjYWY2IiwibmFtZWlkIjoiQWxhbiBkZSBPbGl2ZWlyYSBGZXJyZXJpYSIsIm5iZiI6MTc1NDUxNDY5OSwiZXhwIjoxNzYzMTU0Njk5LCJpYXQiOjE3NTQ1MTQ2OTksImlzcyI6ImJsb2thci5jb20iLCJhdWQiOiJibG9rYXIuY29tIn0.ZL0PasSnPcGS62CGn_iliN8EKDQkGXWhZvGjzyso25U";

  const token = store.token;

  // Função que lida com as requisições HTTP usando $fetch
  const handleRequest = async (
    method,
    endpoint,
    payload = null,
    options = {}
  ) => {
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);

    try {
      loading.value = true;

      const fetchOptions = {
        method,
        baseURL,
        headers: {
          Authorization: `Bearer ${
            token ?? localStorage.getItem("sessionToken")
          }`,
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        ...options,
      };

      if (payload && method !== "GET" && method !== "DELETE") {
        fetchOptions.body = payload;
      }

      data.value = await $fetch(endpoint, fetchOptions);
    } catch (err) {
      error.value = err?.data || err?.message || "An unknown error occurred";
    } finally {
      loading.value = false;
    }

    return { data, loading, error };
  };

  // Funções HTTP específicas
  const get = (endpoint, options = {}) =>
    handleRequest("GET", endpoint, null, options);
  const post = (endpoint, payload = {}, options = {}) =>
    handleRequest("POST", endpoint, payload, options);
  const put = (endpoint, payload = {}, options = {}) =>
    handleRequest("PUT", endpoint, payload, options);
  const del = (endpoint, options = {}) =>
    handleRequest("DELETE", endpoint, null, options);
  const patch = (endpoint, payload = {}, options = {}) =>
    handleRequest("PATCH", endpoint, payload, options);

  return {
    get,
    post,
    put,
    patch,
    delete: del,
  };
};
