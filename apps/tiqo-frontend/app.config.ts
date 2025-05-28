export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral',
    },

    button: {
      base: 'cursor-pointer justify-center',
      variants: {
        size: {
          xl: {
            base: 'p-3 rounded-full'
          }
        }
      },
    }
  }
});
