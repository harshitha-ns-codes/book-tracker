#include<iostream>
using namespace std;


class Solution {
  public:
    void printNumbers(int n) {
        int i;
        if(i < n) return;
        cout << i << endl;
        printNumbers(n - 1);
        
    }
};

int main(){
    Solution sol;
     sol.printNumbers(5);
    return 0;
}