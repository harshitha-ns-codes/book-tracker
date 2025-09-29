#include <iostream>
using namespace std;

void f(int i, int arr[], int n) {
    if (i >= n/2) return;       // base case
    swap(arr[i], arr[n-i-1]);   // swap elements
    f(i+1, arr, n);             // recursive call
}

int main() {
    int n;
    cin >> n;                   // read n first
    int arr[n];           // now declare array of size n

    for (int i = 0; i < n; i++) {
        cin >> arr[i];          // input array
    }

    f(0, arr, n);               // reverse array using recursion

    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";  // print reversed array
    }
    return 0;                   // exit program
}
