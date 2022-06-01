import { Vue, Component, InjectReactive, Inject } from 'vue-property-decorator';

@Component({
  name: 'KwUi',
})
export default class KwUi extends Vue {
  @Inject()
  private appMaxWidth!: string | number;

  @InjectReactive()
  public breakpoint!: 'sm' | 'md' | 'lg';

  @InjectReactive()
  public vw!: number;
}
