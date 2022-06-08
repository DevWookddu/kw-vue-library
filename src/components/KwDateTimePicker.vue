<template>
  <div class="kw-calendar">
    <button ref="refButton" class="display-button" @click="openSelectLayer()">📅 {{ displayText }}</button>
    <KwContainerTransition>
      <KwContainer v-if="show" container-max-width="768px">
        <template #header>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 20px;
              font-size: 20px;
              font-weight: bold;
              color: black;
            "
          >
            <button @click="onMoveMonth(-1)">&lt;</button>
            <span>{{ $dayjs(yearMonth).format('YYYY년 MM월') }}</span>
            <button @click="onMoveMonth(1)">></button>
          </div>
          <div class="calendar">
            <div v-for="(day, dindex) in days" :key="day" class="day" :class="`d-${dindex}`">
              {{ day }}
            </div>
          </div>
        </template>
        <template #body>
          <div class="calendar">
            <div
              v-for="date in dates"
              :key="date.idx"
              class="cell"
              :class="getCellClass(date)"
              @click="onClickCell(date)"
            >
              <span v-if="date.type === 'date'">
                {{ date.date }}
              </span>
            </div>
          </div>
        </template>
        <template #footer>
          <div v-if="useTime" class="time-container">
            <div class="time">
              <h2 class="title">시작 시간</h2>
              <div class="time-wrap">
                <KwSelect
                  :value="startHours"
                  :options="hourOptions"
                  type="number"
                  @change="onChangeTime('start', 'hour', arguments[0])"
                />
                <KwSelect
                  :value="startMinutes"
                  :options="minuteOptions"
                  type="number"
                  @change="onChangeTime('start', 'minute', arguments[0])"
                />
              </div>
            </div>
            <div v-if="isPeriodType" class="time">
              <h2 class="title">종료 시간</h2>
              <div class="time-wrap">
                <KwSelect
                  :value="endHours"
                  :options="hourOptions"
                  type="number"
                  @change="onChangeTime('end', 'hour', arguments[0])"
                />
                <KwSelect
                  :value="endMinutes"
                  :options="minuteOptions"
                  type="number"
                  @change="onChangeTime('end', 'minute', arguments[0])"
                />
              </div>
            </div>
          </div>
          <div style="padding: 10px">
            <KwButton block :disabled="confirmDisabled" @click="onConfirm()">확인</KwButton>
          </div>
        </template>
      </KwContainer>
    </KwContainerTransition>
  </div>
</template>

<script lang="ts">
import { Component, ModelSync, Prop, Ref } from 'vue-property-decorator';
import KwUi from './KwUi';

type CellDate =
  | {
      type: 'date';
      idx: number;
      yyyymmdd: string;
      date: number;
    }
  | {
      type: 'dummy';
      idx: number;
    };

@Component({
  name: 'KwDateTimePicker',
})
export default class KwDateTimePicker extends KwUi {
  @Ref() private refButton!: HTMLButtonElement;

  private days = '일월화수목금토'.split('');

  private show = false;

  @Prop({ default: 'single' })
  private type!: 'single' | 'period';

  @Prop({ type: Boolean, default: false })
  private useTime!: boolean;

  @ModelSync('value', 'change', { default: () => [] })
  private model!: Array<string>;

  @Prop({ default: 'YYYY-MM-DD' })
  private dateFormat!: string;

  @Prop({ default: 'HH:mm' })
  private timeFormat!: string;

  get displayText() {
    const { isPeriodType, model, dateFormat, timeFormat } = this;
    const useFormat = `${dateFormat}${this.useTime ? ` ${timeFormat}` : ''}`;
    const [start, end] = model;
    if (isPeriodType) {
      if (start && end) {
        return `${this.$dayjs(start).format(useFormat)} ~ ${this.$dayjs(end).format(useFormat)}`;
      } else {
        return '선택해주세요';
      }
    }
    return start ? this.$dayjs(start).format(useFormat) : '선택해주세요';
  }

  private startDate = '';
  get startDateDayjs() {
    return this.startDate ? this.$dayjs(this.startDate) : null;
  }
  private startTime = '';
  get startHours() {
    return Number(this.startTime.split(':')[0]);
  }
  get startMinutes() {
    return Number(this.startTime.split(':')[1]);
  }

  private endDate = '';
  get endDateDayjs() {
    return this.endDate ? this.$dayjs(this.endDate) : null;
  }
  private endTime = '';
  get endHours() {
    return Number(this.endTime.split(':')[0]);
  }
  get endMinutes() {
    return Number(this.endTime.split(':')[1]);
  }
  private yearMonth = '';

  get isPeriodType() {
    return this.type === 'period';
  }

  public focus() {
    this.refButton.focus();
  }

  public click() {
    this.refButton.click();
  }

  private hourOptions = (() => {
    const hours = [];
    for (let hour = 0; hour < 24; hour++) {
      hours.push({
        value: hour,
        label: `${hour}시`,
      });
    }
    return hours;
  })();

  private minuteOptions = (() => {
    const minutes = [];
    for (let minute = 0; minute < 60; minute++) {
      minutes.push({
        value: minute,
        label: `${minute}분`,
      });
    }
    return minutes;
  })();

  get dates() {
    const { yearMonth } = this;
    const $yearMonth = this.$dayjs(yearMonth, 'YYYY-MM-01');
    const dates: Array<CellDate> = [];
    const monthStartDay = $yearMonth.day();
    for (let i = monthStartDay; 0 < i; i--) {
      dates.push({
        type: 'dummy',
        idx: i,
      });
    }
    const monthLastDate = $yearMonth.endOf('month').date();
    for (let day = 0; day < monthLastDate; day++) {
      const $date = $yearMonth.add(day, 'day');
      dates.push({
        type: 'date',
        idx: monthStartDay + day + 1,
        yyyymmdd: $date.format(this.dateFormat),
        date: $date.date(),
      });
    }
    return dates;
  }

  get confirmDisabled() {
    return this.isPeriodType ? !this.endDate : !this.startDate;
  }

  private openSelectLayer() {
    const { dateFormat, timeFormat, model, isPeriodType } = this;
    const [start, end] = model;
    const format = `${dateFormat}${isPeriodType ? ` ${timeFormat}` : ''}`;
    const $start = this.$dayjs(start, format);
    const $end = this.$dayjs(end, format);

    if (start) {
      this.startDate = $start.format(dateFormat);
      this.startTime = $start.format(timeFormat);
    } else {
      this.startDate = '';
      this.startTime = '00:00';
    }

    if (start && end) {
      this.endDate = $end.format(dateFormat);
      this.endTime = $end.format(timeFormat);
    } else {
      this.endDate = '';
      this.endTime = '00:00';
    }

    this.yearMonth = $start.format('YYYY-MM');
    this.show = true;
  }

  private getCellClass(date: CellDate) {
    if (date.type === 'dummy') {
      return null;
    }
    const { isPeriodType, startDateDayjs, endDateDayjs, endDate } = this;
    const { yyyymmdd } = date;
    const startEdge = startDateDayjs?.isSame(yyyymmdd, 'dates');
    const endEdge = (!isPeriodType ? startDateDayjs : endDateDayjs)?.isSame(yyyymmdd, 'dates');
    return {
      'start-edge': startEdge,
      'end-edge': endEdge,
      range:
        isPeriodType &&
        endDate &&
        startDateDayjs?.isBefore(yyyymmdd, 'dates') &&
        endDateDayjs?.isAfter(yyyymmdd, 'dates'),
    };
  }

  private closeSelectLayer() {
    this.show = false;
  }

  private onConfirm() {
    const start = this.startDate + (this.useTime ? ` ${this.startTime}` : '');
    const end = this.endDate + (this.useTime ? ` ${this.endTime}` : '');
    if (this.isPeriodType) {
      this.model = [start, end];
    } else {
      this.model = [start];
    }
    this.closeSelectLayer();
  }

  private onMoveMonth(move: number) {
    this.yearMonth = this.$dayjs(this.yearMonth, 'YYYY-MM').add(move, 'month').format('YYYY-MM');
  }

  private onClickCell(date: CellDate) {
    if (date.type === 'dummy') return;
    const { startDate, endDate, isPeriodType } = this;
    const { yyyymmdd } = date;
    if (!isPeriodType || (isPeriodType && endDate)) {
      this.startDate = yyyymmdd;
      this.endDate = '';
    } else {
      if (startDate) {
        if (yyyymmdd < startDate) {
          this.startDate = yyyymmdd;
          this.endDate = startDate;
        } else {
          this.endDate = yyyymmdd;
        }
      } else {
        this.startDate = yyyymmdd;
        this.endDate = '';
      }
    }
  }

  private onChangeTime(type: 'start' | 'end', timeType: 'hour' | 'minute', value: string | number) {
    const typeIsStart = type === 'start';
    const timeArr = (typeIsStart ? this.startTime : this.endTime).split(':');
    const sv = value.toString().padStart(2, '0');
    if (timeType === 'hour') {
      timeArr[0] = sv;
    } else {
      timeArr[1] = sv;
    }
    const time = timeArr.join(':');
    if (typeIsStart) {
      this.startTime = time;
    } else {
      this.endTime = time;
    }
  }
}
</script>

<style scoped lang="scss">
.display-button {
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 600;
  border: 0;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.8);
  background-color: #f5f5f5;
}

.calendar {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
}
.day {
  background-color: #fafafa;
  height: 32px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.d-0,
  &.d-6 {
    color: red;
  }
}
.cell {
  padding-top: 30%;
  padding-bottom: 30%;
  text-align: center;

  &.start-edge,
  &.end-edge {
    color: white;
    background-color: #42a5f5;
  }

  &.start-edge {
    border-top-left-radius: 100%;
    border-bottom-left-radius: 100%;
  }
  &.end-edge {
    border-top-right-radius: 100%;
    border-bottom-right-radius: 100%;
  }

  &.range {
    color: white;
    background-color: #90caf9;
  }
}

.time-container {
  display: flex;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;

  .time {
    flex: 1;
    padding: 10px;

    &:nth-child(2) {
      border-left: 1px solid #ededed;
    }
  }

  .title {
    font-size: 12px;
    font-weight: bold;
  }
}

.time-wrap {
  .kw-select {
    margin-top: 8px;
  }
}
</style>
