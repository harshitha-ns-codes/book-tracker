#include<iostream>
using namespace std;

class Solution {
public:
    int NnumbersSum(int N) {
        // base case
        if (N == 0) return 0;
        
        // recursive case
        return N + NnumbersSum(N - 1);
    }
};


int main(){
    int N;
    cin >> N;
    Solution sum;
    cout << sum.NnumbersSum(N);
    return 0;
}