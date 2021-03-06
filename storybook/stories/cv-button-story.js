import { storiesOf } from '@storybook/vue';
import { boolean, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SvTemplateView from '../_storybook/views/sv-template-view/sv-template-view';
// import consts from '../_storybook/utils/consts';
import knobsHelper from '../_storybook/utils/knobs-helper';

import CvButtonNotesMD from '@carbon/vue/src/components/cv-button/cv-button-notes.md';
import { CvButton, CvIconButton, CvButtonSkeleton, CvButtonSet } from '@carbon/vue/src';

const storiesDefault = storiesOf('Components/CvButton', module);
const storiesExperimental = storiesOf('Experimental/CvButton', module);
const exampleIconPath = require('@carbon/vue/src/assets/images/example-icons.svg');
import AddFilled16 from '@carbon/icons-vue/es/add--filled/16';

let preKnobs = {
  kind: {
    group: 'attr',
    type: select,
    config: [
      'kind',
      {
        default: '',
        primary: 'primary',
        secondary: 'secondary',
        tertiary: 'tertiary',
        ghost: 'ghost',
        danger: 'danger',
      },
      'primary',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'kind',
  },
  size: {
    group: 'attr',
    type: select,
    config: [
      'size',
      {
        default: '',
        field: 'field',
        small: 'small',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'size',
  },
  disabled: {
    group: 'attr',
    type: boolean,
    config: ['disabled', false], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'disabled',
  },
  events: {
    group: 'attr',
    value: `@click="actionClick"`,
  },
  content: {
    group: 'slots',
    slot: 'default',
    value: `I am a button`,
  },
  icon: {
    group: 'attr',
    type: boolean,
    config: ['with icon', false],
    prop: 'icon',
    value: val => (val ? AddFilled16 : undefined),
  },
  iconAlways: {
    group: 'attr',
    prop: 'icon',
    value: () => AddFilled16,
  },
  label: {
    group: 'attr',
    type: text,
    config: ['label for assistive text', 'Icon button'],
    prop: 'label',
  },
  tipPosition: {
    group: 'attr',
    type: select,
    config: [
      'Tip position',
      {
        Top: 'top',
        Right: 'right',
        Bottom: 'bottom',
        Left: 'left',
      },
      'bottom',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'tip-position',
  },
  tipAlignment: {
    group: 'attr',
    type: select,
    config: [
      'Tip alignment',
      {
        Start: 'start',
        Center: 'center',
        End: 'end',
      },
      'center',
      // consts.CONFIG,// fails when used with number in storybook 4.1.4
    ],
    inline: true,
    prop: 'tip-alignment',
  },
};

let variants = [
  {
    name: 'default',
    excludes: ['iconAlways'],
  },
  {
    name: 'icon as path',
    excludes: ['size', 'disabled', 'icon', 'iconHref', 'iconAlways'],
    extra: {
      icon: {
        group: 'attr',
        value: `icon="${exampleIconPath}#icon--add--solid"`,
      },
    },
  },
  {
    name: 'minimal',
    excludes: ['size', 'disabled', 'icon', 'iconAlways'],
  },
];

let storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
<cv-button${settings.group.attr}
>${settings.group.slots}
</cv-button>
    `;
      // console.log(templateString);

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: { CvButton, SvTemplateView },

        methods: {
          actionClick: action('Cv Button - click'),
        },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvButtonNotesMD },
    }
  );
}

variants = [
  {
    name: 'icon-only',
    includes: ['kind', 'size', 'disabled', 'label', 'tipPosition', 'tipAlignment', 'iconAlways'],
  },
];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
<cv-icon-button${settings.group.attr} />
    `;
      // console.log(templateString);

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: { CvIconButton, SvTemplateView },

        methods: {
          actionClick: action('Cv Button - click'),
        },
        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvButtonNotesMD },
    }
  );
}

// cv-button-skeleton

preKnobs = {
  size: {
    group: 'attr',
    type: select,
    config: [
      'size',
      {
        default: '',
        field: 'field',
        small: 'small',
      },
      '',
    ], // consts.CONFIG], // fails when used with number in storybook 4.1.4
    prop: 'size',
  },
};

variants = [{ name: 'skeleton' }];

storySet = knobsHelper.getStorySet(variants, preKnobs);

for (const story of storySet) {
  storiesDefault.add(
    story.name,
    () => {
      const settings = story.knobs();

      const templateString = `
        <cv-button-skeleton${settings.group.attr}></cv-button-skeleton>
      `;

      // ----------------------------------------------------------------

      const templateViewString = `
      <sv-template-view
        sv-margin
        sv-source='${templateString.trim()}'>
        <template slot="component">${templateString}</template>
      </sv-template-view>
    `;

      return {
        components: { CvButtonSkeleton, SvTemplateView },

        template: templateViewString,
        props: settings.props,
      };
    },
    {
      notes: { markdown: CvButtonNotesMD },
    }
  );
}

storiesDefault.add(
  'button-set',
  () => {
    const templateString = `<cv-button-set>
  <cv-button kind="primary">button 1</cv-button>
  <cv-button kind="secondary">button 2</cv-button>
  <cv-button kind="danger">button 3</cv-button>
</cv-button-set>
  `;

    const templateViewString = `
  <sv-template-view
    sv-margin
    sv-source='${templateString.trim()}'>
    <template slot="component">${templateString}</template>
  </sv-template-view>
`;

    return {
      components: { CvButtonSet, CvButton, SvTemplateView },
      template: templateViewString,
    };
  },
  {
    notes: { markdown: CvButtonNotesMD },
  }
);
