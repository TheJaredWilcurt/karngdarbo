import { shallowMount } from '@vue/test-utils';

import App from '@/App.vue';

describe('App.vue', () => {
  describe('Created', () => {
    test('Default snapshot', () => {
      const wrapper = shallowMount(App);

      expect(wrapper.html())
        .toMatchSnapshot();
    });
  });
});
