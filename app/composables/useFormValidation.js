export const useFormValidation = () => {
  const errors = ref({});

  const setError = (field, message) => {
    errors.value[field] = message;
  };

  const clearError = (field) => {
    delete errors.value[field];
  };

  const clearAllErrors = () => {
    errors.value = {};
  };

  const hasErrors = computed(() => {
    return Object.keys(errors.value).length > 0;
  });

  const getError = (field) => {
    return errors.value[field] || "";
  };

  return {
    errors,
    setError,
    clearError,
    clearAllErrors,
    hasErrors,
    getError,
  };
};
