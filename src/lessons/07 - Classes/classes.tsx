import type { LessonMeta } from '../registry.ts'

export const meta: LessonMeta = {
  section: '3 · Type System Tools',
  title: 'Classes & Access Modifiers',
  summary: 'TypeScript adds field types, access modifiers, parameter properties, and interface implementation on top of JavaScript classes.',
}

interface Account { // implementsIface
  readonly owner: string
  readonly balance: number
  deposit(amount: number): void
}

class BankAccount implements Account {
  static bankName = 'TS Bank' // staticMember
  private _balance: number // privateField

  constructor(
    public readonly owner: string, // paramProperty
    initial: number,
  ) {
    this._balance = initial
  }

  get balance(): number { // getter
    return this._balance
  }

  deposit(amount: number): void { // method
    this._balance += amount
  }

  protected applyRate(rate: number): void { // protectedMember
    this._balance *= 1 + rate
  }
}

class SavingsAccount extends BankAccount { // inheritance
  addYearlyInterest(): void {
    this.applyRate(0.05)
  }
}

const acct = new BankAccount('Kadir', 100)
acct.deposit(50)

const savings = new SavingsAccount('Kadir', 1000)
savings.addYearlyInterest()

export default function Demo() {
  return (
    <div>
      <h4>BankAccount (implements Account)</h4>
      <div className="rows">
        <div className="row"><span className="k">BankAccount.bankName</span><span className="v">{BankAccount.bankName}</span></div>
        <div className="row"><span className="k">acct.owner</span><span className="v">{acct.owner}</span></div>
        <div className="row"><span className="k">acct.balance (after +50)</span><span className="v">{acct.balance}</span></div>
      </div>

      <h4>SavingsAccount extends BankAccount</h4>
      <div className="rows">
        <div className="row"><span className="k">savings.owner</span><span className="v">{savings.owner}</span></div>
        <div className="row"><span className="k">balance after 5% interest</span><span className="v">{savings.balance}</span></div>
      </div>

      <p className="hint">Try <span className="t">acct._balance</span> or <span className="t">acct.applyRate(0.1)</span> from out here: both are compile errors.</p>
    </div>
  )
}
