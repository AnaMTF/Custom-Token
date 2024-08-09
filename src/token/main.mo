import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {
    var owner : Principal = Principal.fromText("3yr4e-jh5j6-zda4p-2j3gp-pph5y-hs5g2-rr2nw-xolar-nprxy-6fnd3-6qe");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "TANA";

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    balances.put(owner, totalSupply);

    public query func balanceOf(who: Principal) : async Nat {
        let balance : Nat = switch(balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func Payout() : async Text{
        if(balances.get(msg.caller) == null){
        let amount = 10000;
        balances.put(msg.caller, amount);
        return "Success";
        } else {
            return "Already claimed";
        }
    };

    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
        let fromBalance = await balanceOf(msg.caller);
        if( fromBalance > amount){
            let newFromBalance : Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance : Nat = toBalance + amount;
            balances.put(to, newToBalance);
            return "Success";
        }else{
            return "Insufficient balance";
        }

        
    };
};

