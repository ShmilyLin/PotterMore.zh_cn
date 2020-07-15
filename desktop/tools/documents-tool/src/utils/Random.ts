const Random = {
    String: 'abcdefghijklmnopqrstuvwxyz0123456789',
    ID() {
        return `${Math.random().toString(36).substr(2)}-${this.get(4)}-${this.get(4)}-${new Date().getTime().toString(36)}`;
    },
    get(num: number) {
        let result = '';
        for(let i = 0; i < num; i++) {
            result += this.String[Math.floor(Math.random() * this.String.length)];
        }
        return result;
    }
}

export default Random;