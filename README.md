# Product-Recommendation
||| Question Statement |||

The bank is producing a tool to recommend a 'bundle' of products to prospective customers.
The customer may then customize this bundle further, by adding, removing, or upgrading
products.
There are rules which govern what products a customer may choose, based upon:
* Answers to questions that the customer has given
A customer may only have one account (eg: not Current Account and Pensioner Account).
Where a customer is eligible for more than one bundle then they must be offered the highest
value bundle (where 3 is the highest value, and 0 is the lowest).
User specific questions:
Question Possible Answers
Age 0-17, 18-64, 65+
Student Yes, No
Income 0, 1-12000,12001-40000,40001+
Rules:
Product Rules
Current Account Income> 0 & Age > 17
Current Account Plus Income > 40000 & Age > 17
Junior Saver Account Age < 18
Student Account Student = Yes & Age > 17
Debit Card Bundle must include one of: Current Account,
Current Account Plus, Student Account, or
Pensioner Account
Credit Card Income > 12000 & Age > 17
Gold Credit Card Income > 40000 & Age > 17
Bundles:
Bundle Products Included Rules Value
Junior Saver Junior Saver Account Age < 18 0
Student Student Account,
Debit Card, Credit
Card
Age > 17 & Student =
Yes
0
Classic Current Account,
Debit Card
Age > 17 & Income >
0
1
Classic Plus Current Account,
Debit Card, Credit
Card
Income > 12000 &
Age > 17
2
Gold Current Account
Plus, Debit Card,
Gold Credit Card
Income > 40000 &
Age > 17
3
Ex:
1. Input:
Age: 16, Student: yes, Income: 0
Output: 0
2. Input:
Age: 18, Student: no, Income: 25000
Output: 2
Write a unit tested module that:
1. Given answers to the questions, returns a recommended bundle
2. Given a bundle and answers to the questions makes appropriate modifications to the bundle
(eg remove the debit card, swap classic account for the classic plus account, etc…) and returns
the resulting bundle. All of the rules for product availability must be respected, and if a
requested modification to the bundle is not permitted then the response must give a reason
why.
