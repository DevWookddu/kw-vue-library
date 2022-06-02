import { Vue, Component, InjectReactive, Inject } from 'vue-property-decorator';

@Component({
  name: 'KwUi',
})
export default class KwUi extends Vue {
  @Inject()
  protected appMaxWidth!: string | number;

  @InjectReactive()
  protected breakpoint!: 'sm' | 'md' | 'lg';

  @InjectReactive()
  protected vw!: number;
}
