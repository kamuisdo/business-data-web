import { ObjectValue,ObjectValueCollection } from './objectValueService'

class  A1  extends ObjectValue{
    constructor(){
        super('A1', '商店','A1')
    }
}

class A2  extends ObjectValue{
    constructor(){
        super('A2', '餐馆，娱乐场所','A2')
    }
}
class A3 extends ObjectValue {
    constructor() {
        super('A3', '多店铺', 'A3')
    }
}
class B1 extends ObjectValue {
    constructor() {
        super('B1', '工厂，仓库', 'B1')
    }
}
class B2 extends ObjectValue {
    constructor() {
        super('B2', '办公室', 'B2')
    }
}
class B3 extends ObjectValue {
    constructor() {
        super('B3', '计算机房', 'B3')
    }
}
class C1 extends ObjectValue {
    constructor() {
        super('C1', '政府机构', 'C1')
    }
}
class C2 extends ObjectValue {
    constructor() {
        super('C2', '医院机构', 'C2')
    }
}
class C3 extends ObjectValue {
    constructor() {
        super('C3', '学校，教育机构', 'C3')
    }
}
class C4 extends ObjectValue {
    constructor() {
        super('C4', '银行机构', 'C4')
    }
}
class D1 extends ObjectValue {
    constructor() {
        super('D1', '宾馆，旅社', 'D1')
    }
}
class E1 extends ObjectValue {
    constructor() {
        super('E1', '私人住宅', 'E1')
    }
}
class ZZ extends ObjectValue {
    constructor() {
        super('ZZ', '其他', 'ZZ')
    }
}


class ProjectType extends ObjectValueCollection{
    constructor() {
        super();
        this.add(new A1());
        this.add(new A2());
        this.add(new A3());
        this.add(new B1());
        this.add(new B2());
        this.add(new B3());
        this.add(new C1());
        this.add(new C2());
        this.add(new C3());
        this.add(new C4());
        this.add(new D1());
        this.add(new E1());
        this.add(new ZZ());
    }
}


export const ProjectTypeEnum = new ProjectType();
