#include<iostream>
using namespace std;

void f(int i,int n){
    if(i>3) return;
    cout << "raj";
    f(i+1,n);
}
 int main(){
    int n;
    cin>>n;
    f(1,n);
    return 0;
    
}
// time complexity = o(N)
// space complexity = o(N)